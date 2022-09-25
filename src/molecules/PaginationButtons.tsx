import { FC } from 'react';
import styled from 'styled-components';
import { useAllIssues } from '../hooks/useAllIssues';

export const PaginationButtons: FC = (props) => {
  const { page, setPage } = useAllIssues();
  return (
    <StyledButtonsContainer>
      <StyledPaginationButton onClick={() => setPage(page - 1)}>-</StyledPaginationButton>
      <div>{page}</div>
      <StyledPaginationButton onClick={() => setPage(page + 1)}>＋</StyledPaginationButton>
    </StyledButtonsContainer>
  );
};

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  width: 100px;
`;
const StyledPaginationButton = styled.button`
  border: 1px solid #000;
  width: 20px;
  text-align: center;
`;
