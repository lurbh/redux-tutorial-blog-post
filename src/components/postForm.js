import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCallback, useState } from 'react';

const PostForm = ({ post, onSubmit }) => {
    const postToBeEdited = post || {};

    const [title, setTitle] = useState(postToBeEdited.title || "");
    const [content, setContent] = useState(postToBeEdited.content || "");

    const onFormSubmit = useCallback((e) => {
        // We don't want to make use of the default behaviour of the form submission.
        // (The default behaviour is to make a network request to some URL)
        e.preventDefault();

        // Instead, we want to callback to the parent that something has
        // changed
        onSubmit({
            id: postToBeEdited.id, // This will be undefined if there was no post originally
            title,
            content,
        });
    },
        // We have to regenerate the callback when title or content is updated, otherwise
        // the changes will not be "submitted" to the parent component. Hence, we add
        // `title` and `content` as dependencies for the hook.
        [title, content],
    );


    return (
        <Card className="p-3">
            <Form onSubmit={onFormSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="content" className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows={5}
                        placeholder="Enter your post content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
        </Card>
    )
}


export default PostForm;