import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { marked } from 'marked';
import { togglePage } from '../redux/modules/currentPage';
import { selectDetail } from '../redux/modules/detail';
import { StyledUserIcon, StyledUserIconImage } from '../molecules/IssueItem';

export const rawMarkup = (markup: string) => {
  const rawMarkup = marked(markup);
  return { __html: rawMarkup };
};

export const Detail: FC = () => {
  const selector = useSelector(selectDetail);
  const dispatch = useDispatch();

  return (
    <StyledDetailContainer>
      <StyledHeading>{selector.title}</StyledHeading>
      <StyledLink
        onClick={() => {
          dispatch(togglePage('index'));
        }}
      >
        Back to Issues List
      </StyledLink>
      <StyledFlex>
        <p>#{selector.number}</p>
        <StyledState>{selector.state}</StyledState>
        <div>
          <StyledUserIcon>
            <StyledUserIconImage src={selector.user.avatar_url} alt="" />
          </StyledUserIcon>
          <div>{selector.user.login}</div>
        </div>
      </StyledFlex>
      <StyledStatus>
        {selector.labels.map(({ name }) => (
          <li>{name}</li>
        ))}
      </StyledStatus>
      <hr />
      <StyledBody dangerouslySetInnerHTML={rawMarkup(selector.body)} />
      <hr />
      <p></p>
    </StyledDetailContainer>
  );
};

const StyledDetailContainer = styled.div`
  max-width: 1000px;
  padding: 40px 0;
  margin: 0 auto;
`;

const StyledHeading = styled.h1`
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledLink = styled.button`
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledStatus = styled.ul`
  margin-bottom: 20px;
`;

const StyledBody = styled.div`
  padding: 20px;

  * {
    max-width: 100%;
  }
`;

const StyledState = styled.div`
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 60px;
`;
