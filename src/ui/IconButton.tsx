import styled from '@emotion/styled';

export const IconButton = styled.button`
  border-radius: 50%;
  padding: 4px;
  transition: background-color var(--theme-hover-duration) ease-in-out;

  &:hover {
    background-color: var(--theme-hover);
  }

  &:active {
    background-color: var(--theme-hover-active);
  }
`;

IconButton.defaultProps = {
  type: 'button',
};
