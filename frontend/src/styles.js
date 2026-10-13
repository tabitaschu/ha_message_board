import { css } from "lit";

// Styles shared by several components.
export const sharedStyles = css`
  button {
    font: inherit;
    padding: 4px 12px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    color: var(--text-primary-color);
    background: var(--primary-color);
  }
  button.secondary {
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
  }
  button.plain {
    padding: 2px 6px;
    color: var(--secondary-text-color);
    background: none;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .meta {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }
  .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary-color);
  }
`;
