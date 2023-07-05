import { FC, FormEvent, useState, memo } from 'react';
import axios from 'axios';

interface IProps {
	postId: string;
}

const CommentCreate: FC<IProps> = ({ postId }) => {
		console.log('rendered')
    const [content, setContent] = useState('');

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content,
        });

        setContent('');
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='form-control'
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
};

export default memo(CommentCreate);
