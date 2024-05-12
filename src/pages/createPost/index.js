import { useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../store/posts/reducer";
import PostForm from '../../components/postForm';

const CreatePostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((post) => {
        dispatch(createPost(post));

        // Go back to home page
        navigate("/");
    }, []);

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Blog Post Example</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        Creating Post
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <PostForm onSubmit={onSubmit}/>
            </Container>
        </>
    );
};

export default CreatePostPage;