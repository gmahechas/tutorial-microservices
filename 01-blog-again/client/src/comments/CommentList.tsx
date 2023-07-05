import { FC, useEffect, useState, memo } from 'react';
import axios from 'axios';

interface IProps {
    postId: string;
}

const CommentList: FC<IProps> = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(
            `http://localhost:4001/posts/${postId}/comments`
        );

        setComments(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments =
        comments &&
        comments.map((comment: any) => {
            return <li key={comment.id}>{comment.content}</li>;
        });

    return <ul>{renderedComments}</ul>;
};

export default memo(CommentList);
