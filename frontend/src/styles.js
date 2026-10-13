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

  /* Priority colour, set once per class and reused by borders, badges and buttons. */
  .prio-low {
    --prio-color: var(--disabled-text-color, #9e9e9e);
  }
  .prio-normal {
    --prio-color: var(--primary-color);
  }
  .prio-high {
    --prio-color: var(--error-color, #db4437);
  }
  button[class^="prio-"],
  .prio-badge {
    color: var(--text-primary-color);
    background: var(--prio-color);
  }
  .prio-badge {
    padding: 0 8px;
    border-radius: 10px;
    font-size: 0.8em;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 10px;
    font-size: 0.8em;
    color: var(--primary-text-color);
    background: rgba(var(--rgb-primary-color), 0.15);
  }
`;
