import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { marked } from 'marked';
import { togglePage } from '../redux/modules/currentPage';
import { selectDetail } from '../redux/modules/detail';

export const Detail: FC = () => {
  const selector = useSelector(selectDetail);
  const dispatch = useDispatch();

  return (
    <StyledDetailContainer>
      <h1>{selector.title}</h1>
      <button
        onClick={() => {
          dispatch(togglePage('index'));
        }}
      >
        Back to Issues List
      </button>
      <div>
        <p>#{selector.number}</p>
        <p>{selector.state}</p>
        <div>
          <p>{selector.user.avatar_url}</p>
          <p>{selector.user.login}</p>
        </div>
      </div>
      {selector.labels.map(({ name }) => (
        <li>{name}</li>
      ))}
      <hr />
      <div>{marked(selector.body)}</div>
      <hr />
      <p></p>
    </StyledDetailContainer>
  );
};

const StyledDetailContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
