import React, { MutableRefObject, useEffect, useState, FC } from 'react';
import { motion } from 'framer-motion';
import { BiLogoTypescript } from 'react-icons/bi';
import {
  SiAzuredevops,
  SiGatsby,
  SiKubernetes,
  SiNestjs,
  SiNextdotjs,
} from 'react-icons/si';
import { DiDocker, DiGo, DiJavascript, DiNodejs } from 'react-icons/di';

enum ICON_SIZE {
  SMALL = 50,
  MEDIUM = 70,
  LARGE = 80,
}

// Define constants for easier adjustments
const OSCILLATION_AMPLITUDE = 0; // No oscillation for smoother movement
const UPDATE_INTERVAL = 50; // Update positions every 50ms
const INITIAL_OFFSET_RANGE = 100; // Initial position randomness
const MIN_DISTANCE_FACTOR = 2.5; // Multiplier for minimum distance based on icon size
const HOVER_SCALE = 1.5; // Scale factor when hovered

// Define the icons with their sizes and titles
const icons = [
  { component: BiLogoTypescript, size: ICON_SIZE.LARGE, title: 'TypeScript' },
  { component: SiNestjs, size: ICON_SIZE.LARGE, title: 'NestJS' },
  { component: DiDocker, size: ICON_SIZE.LARGE, title: 'Docker' },
  { component: DiGo, size: ICON_SIZE.MEDIUM, title: 'Golang' },
  { component: DiJavascript, size: ICON_SIZE.MEDIUM, title: 'JavaScript' },
  { component: DiNodejs, size: ICON_SIZE.MEDIUM, title: 'NodeJS' },
  { component: SiGatsby, size: ICON_SIZE.MEDIUM, title: 'GatsbyJS' },
  { component: SiNextdotjs, size: ICON_SIZE.SMALL, title: 'NextJS' },
  { component: SiKubernetes, size: ICON_SIZE.SMALL, title: 'Kubernetes' },
  { component: SiAzuredevops, size: ICON_SIZE.SMALL, title: 'Azure' },
];

type IconData = {
  component: React.ComponentType<{ size: number }>;
  size: number;
  title: string;
};

type IconPosition = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  radius: number;
  isHovered: boolean;
  scale: number;
};

type Props = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
};

const FloatingIcons: FC<Props> = ({ containerRef }) => {
  const [positions, setPositions] = useState<IconPosition[]>([]);

  // Initialize icon positions
  useEffect(() => {
    if (containerRef.current) {
      const initPositions = icons.map((icon) => {
        const { size } = icon;
        const radius = size / 2;
        return {
          x:
            containerRef.current!.clientWidth / 2 +
            (Math.random() * INITIAL_OFFSET_RANGE - INITIAL_OFFSET_RANGE / 2),
          y:
            containerRef.current!.clientHeight / 2 +
            (Math.random() * INITIAL_OFFSET_RANGE - INITIAL_OFFSET_RANGE / 2),
          vx: Math.random() * 2 - 1, // Random velocity x
          vy: Math.random() * 2 - 1, // Random velocity y
          size,
          radius,
          isHovered: false,
          scale: 1, // Initial scale is 1
        };
      });
      setPositions(initPositions);
    }
  }, [containerRef]);

  // Update positions
  useEffect(() => {
    const updatePositions = () => {
      setPositions((prevPositions) => {
        const newPositions = prevPositions.map((icon, index) => {
          let { x, y, vx, vy, size, radius, isHovered, scale } = icon;

          // Update velocity with oscillation (if any)
          vx +=
            Math.sin(Date.now() * 0.001 + index) * OSCILLATION_AMPLITUDE * 0.01;
          vy +=
            Math.cos(Date.now() * 0.001 + index) * OSCILLATION_AMPLITUDE * 0.01;

          // Apply velocity to position
          x += vx;
          y += vy;

          // Adjust size and radius based on scale
          const adjustedSize = size * scale;
          const adjustedRadius = radius * scale;

          // Boundary collision detection
          if (containerRef.current) {
            const maxX = containerRef.current.clientWidth - adjustedSize;
            const maxY = containerRef.current.clientHeight - adjustedSize;

            if (x <= 0) {
              x = 0;
              vx *= -1;
            } else if (x >= maxX) {
              x = maxX;
              vx *= -1;
            }
            if (y <= 0) {
              y = 0;
              vy *= -1;
            } else if (y >= maxY) {
              y = maxY;
              vy *= -1;
            }
          }

          return { x, y, vx, vy, size, radius, isHovered, scale };
        });

        // Collision detection and response
        for (let i = 0; i < newPositions.length; i++) {
          for (let j = i + 1; j < newPositions.length; j++) {
            const iconA = newPositions[i];
            const iconB = newPositions[j];

            // Adjust radii based on scale
            const adjustedRadiusA = iconA.radius * iconA.scale;
            const adjustedRadiusB = iconB.radius * iconB.scale;

            const dx = iconB.x - iconA.x;
            const dy = iconB.y - iconA.y;
            const distance = Math.hypot(dx, dy);
            const minDistance =
              (adjustedRadiusA + adjustedRadiusB) * MIN_DISTANCE_FACTOR;

            if (distance < minDistance) {
              // Calculate overlap
              const overlap = minDistance - distance;
              const angle = Math.atan2(dy, dx);

              // Displace icons away from each other
              const displacementX = (overlap / 2) * Math.cos(angle);
              const displacementY = (overlap / 2) * Math.sin(angle);

              iconA.x -= displacementX;
              iconA.y -= displacementY;
              iconB.x += displacementX;
              iconB.y += displacementY;

              // Update velocities to reflect collision
              iconA.vx -= displacementX * 0.05;
              iconA.vy -= displacementY * 0.05;
              iconB.vx += displacementX * 0.05;
              iconB.vy += displacementY * 0.05;
            }
          }
        }

        return newPositions;
      });
    };

    const intervalId = setInterval(updatePositions, UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [containerRef]);

  return (
    <div className="w-full h-full relative">
      {positions.map((pos, index) => {
        const { x, y, size, isHovered } = pos;
        const iconData = icons[index % icons.length];
        const IconComponent = iconData.component;
        const title = iconData.title;

        return (
          <motion.div
            key={index}
            className="absolute text-center cursor-pointer"
            style={{
              width: `${size}px`,
              pointerEvents: 'auto',
            }}
            animate={{ x, y, scale: pos.scale }}
            transition={{ type: 'spring', stiffness: 100, damping: 100 }}
            onMouseEnter={() => {
              setPositions((prevPositions) => {
                const newPositions = [...prevPositions];
                newPositions[index] = {
                  ...newPositions[index],
                  isHovered: true,
                  scale: HOVER_SCALE,
                };
                return newPositions;
              });
            }}
            onMouseLeave={() => {
              setPositions((prevPositions) => {
                const newPositions = [...prevPositions];
                newPositions[index] = {
                  ...newPositions[index],
                  isHovered: false,
                  scale: 1,
                };
                return newPositions;
              });
            }}
          >
            <div className="flex flex-col items-center">
              <IconComponent size={size} />
              <p className="mt-1 text-sm">{title}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;
