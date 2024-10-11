import React, { FC } from "react";
import { cn } from "@src/utils/cn";
import { motion } from "framer-motion";

// Spinner component
export const Spinner: FC = () => (
  <motion.div
    className="inline-block w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ ease: 'linear', duration: 1, repeat: Infinity }}

  />
);

// Extract props from motion.button
type MotionButtonProps = React.ComponentProps<typeof motion.button>;

// Extend with your custom props
type ButtonProps = MotionButtonProps & {
  isLoading?: boolean;
};



// Define the Button component
export const Button: FC<ButtonProps> = ({
  children,
  isLoading = false,
  className,
  ...rest
}) => {
  return (
    <motion.button
      className={cn(
        // Default styles
        `p-3  
        uppercase
        cursor-pointer 
        border-gray-600
        border-2 rounded 
        hover:bg-gray-800 
        hover:border-gray-800
        hover:text-gray-300
        dark:text-white`,
        // Conditional styles
        isLoading && 'opacity-50 cursor-not-allowed',
        // Custom className from props
        className // Ensure this is applied last
      )}
      {...rest}
      disabled={isLoading} // Optionally disable the button when loading
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <Spinner />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};
