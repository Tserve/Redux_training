import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { togglePage } from '../redux/modules/currentPage';
import { setDetail } from '../redux/modules/detail';
import { Issue } from '../types';

const MAX_LENGTH = 140;

type Props = {
  issue: Issue;
};

export const IssueItem: FC<Props> = memo((props) => {
  const { issue } = props;
  const dispatch = useDispatch();

  // const sliceText = (text: string): string => {
  //   return text.slice(0, MAX_LENGTH) + '…';
  // };

  const sendToDetail = () => {
    dispatch(
      setDetail({
        title: issue.title,
        number: issue.number,
        state: issue.state,
        user: {
          avatar_url: issue.user.avatar_url,
          login: issue.user.login,
        },
        body: issue.body,
        labels: issue.labels,
      }),
    );
    dispatch(togglePage('detail'));
  };

  return (
    <StyledIssueItem>
      <StyledUserLink href={issue.user.html_url}>
        <StyledUserIcon>
          <StyledUserIconImage src={issue.user.avatar_url} alt={issue.user.login} />
        </StyledUserIcon>
        <StyledUserName>{issue.user.login}</StyledUserName>
      </StyledUserLink>
      <div>
        <StyledIssueNumber>#{issue.number}</StyledIssueNumber>
        <StyledIssueTitle onClick={sendToDetail}>{issue.title}</StyledIssueTitle>
        <StyledIssueComment>{`(${issue.comments} comments)`}</StyledIssueComment>

        <StyledIssueContent>{issue.body}</StyledIssueContent>
        <ul></ul>
        {issue.labels.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </div>
    </StyledIssueItem>
  );
});

const StyledIssueItem = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
  padding: 20px 0;
`;

const StyledUserLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  flex-shrink: 0;
`;

const StyledUserIcon = styled.p`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledUserIconImage = styled.img`
  width: 100%;
`;

const StyledUserName = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;

const StyledIssueNumber = styled.span`
  color: #aaa;
  display: inline-block;
  margin-right: 8px;
`;

const StyledIssueTitle = styled.span`
  font-weight: bold;
`;

const StyledIssueComment = styled.div`
  margin-bottom: 12px;
`;

const StyledIssueContent = styled.div`
  margin-bottom: 12px;
`;
