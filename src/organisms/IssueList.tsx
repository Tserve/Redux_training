import axios from 'axios';
import { FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IssueItem } from '../molecules/IssueItem';
// import { PaginationButtons } from '../molecules/PaginationButtons';
import { Issue } from '../types';

export const IssueList: FC = memo(() => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [owner, setOwner] = useState('Facebook');
  const [repository, setRepository] = useState('react');

  const getIssues = () => {
    setIsLoading(true);
    axios
      .get<Issue[]>(`https://api.github.com/repos/${owner}/${repository}/issues?per_page=25&page=${page}`)
      .then((response) => {
        console.log(response);
        setIssues(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          alert('リクエスト制限を超えたため、後ほど更新かけてください。');
        }
        if (err.response.status === 404) {
          alert('Issueが見つかりませんでした。検索内容を変更してください。');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getIssues();
  }, [page, setRepository, setOwner]);

  return (
    <>
      <StyledInputContainer>
        <StyledInput
          type="text"
          value={owner}
          placeholder="organizer"
          onChange={(event) => {
            setOwner(event.target.value);
          }}
          required
        />
        <StyledInput
          type="text"
          value={repository}
          placeholder="repository"
          onChange={(event) => {
            setRepository(event.target.value);
          }}
          required
        />
        <StyledButton onClick={getIssues}>send</StyledButton>
      </StyledInputContainer>

      <StyledButtonsContainer>
        <StyledPaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          -
        </StyledPaginationButton>
        <div>{page}</div>
        <StyledPaginationButton onClick={() => setPage(page + 1)}>＋</StyledPaginationButton>
      </StyledButtonsContainer>

      <StyledIssueList>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          issues.map((issue) => (
            <li key={issue.id}>
              <IssueItem issue={issue} />
            </li>
          ))
        )}
        {issues.length === 0 && !isLoading && <div>Issueがありません</div>}
      </StyledIssueList>
    </>
  );
});

const StyledIssueList = styled.ul`
  margin: 0 auto;
  max-width: 780px;
  border: 1px solid #000;
  padding: 0 20px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  width: 100px;
  padding: 20px 0;
`;
const StyledPaginationButton = styled.button`
  border: 1px solid #000;
  width: 20px;
  text-align: center;

  :disabled {
    opacity: 0.2;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 4px;
  width: 100px;
  font-size: 16px;
  margin-right: 4px;
  padding: 4px 8px;
`;

const StyledButton = styled.button`
  border: 1px solid #000;
  border-radius: 4px;
`;
