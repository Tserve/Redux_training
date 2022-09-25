import axios from 'axios';
import { useEffect, useState } from 'react';
import { Issue } from '../types';

export const useAllIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);

  const getIssues = (page: number) => {
    axios
      .get<Issue[]>(`https://api.github.com/repos/Facebook/react/issues?per_page=25&page=${page}`)
      .then((response) => {
        const newIssues = response.data;
        console.log(newIssues);
        setIssues(newIssues);
      });
  };

  return { issues, getIssues, setIssues, page, setPage };
};
