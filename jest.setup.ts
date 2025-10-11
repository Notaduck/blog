import "@testing-library/jest-dom";

global.___loader = {
  enqueue: jest.fn(),
  hovering: jest.fn(),
};

window.___navigate = jest.fn();
