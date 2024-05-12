import { useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, selectPostById } from "../../store/posts/reducer";
import PostForm from '../../components/postForm';

const EditPostPage = () => {
    const { id } = useParams();
    const postToEdit = useSelector(selectPostById(id));
    const isValid = !!postToEdit;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((post) => {
        if (!isValid) {
            // This is unexpected
            console.error("Attempted to edit an invalid post");

            // Perhaps we can show a toast as an improvement?
            return;
        }

        dispatch(editPost(post));

        // Go back to home page
        navigate("/");
    }, [isValid]);

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Blog Post Example</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        Editing Post
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <PostForm post={postToEdit} onSubmit={onSubmit}/>
            </Container>
        </>
    );
};

export default EditPostPage;