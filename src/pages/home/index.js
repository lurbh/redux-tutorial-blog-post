import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { FilePlus, Pencil, Trash, Pin, PinFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime } from '../../utils';
import { deletePost, pinPost, selectAllPosts } from '../../store/posts/reducer';
import './index.css';
import { useCallback, useState } from 'react';


const PostHeader = ({ post }) => (
    <div className="post-header mb-2">
        {post.title}
    </div>
);

const PostBody = ({ post }) => (
    <div className="post-body">
        {post.content}
    </div>
);

const PostFooter = ({ post, onDelete, onPin }) => (
    <div className="mt-4 post-footer">
        <div className="post-timestamps">
            Posted on: {formatDateTime(post.createdAt)}
            <br />
            Last updated: {formatDateTime(post.updatedAt)}
        </div>

        <div className="post-footer-spacer"></div>
        <div>
            <Button size="sm" variant='danger' onClick={onDelete}><Trash /></Button>&nbsp;
            <Button size='sm' variant='info' onClick={onPin}>{post.pinned?<PinFill />:<Pin />}</Button>&nbsp;
            <Link to={`/posts/${post.id}`}><Button size="sm"><Pencil /></Button></Link>
        </div>
    </div>
);

const ConfirmDeleteModal = ({ show, post, onHide, onYes, onNo }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Delete this post?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {post.title}
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={() => onYes(post)}>Yes</Button>
            <Button variant="primary" onClick={onNo}>No</Button>
        </Modal.Footer>
    </Modal>
)

const HomePage = () => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedPostForDelete, setSelectedPostForDelete] = useState({});

    const posts = useSelector(selectAllPosts(true));

    const dispatch = useDispatch();

    const onPostDelete = useCallback((post) => {
        setSelectedPostForDelete(post);
        setShowConfirmDelete(true);
    }, []);

    const onPostPin = useCallback((post) => {
        dispatch(pinPost({
            id: post.id,
        }))
    }, []);

    const onConfirmDeleteModalHide = useCallback(() => {
        setShowConfirmDelete(false);
        setSelectedPostForDelete({});
    }, []);

    const onPostDeleteProceed = useCallback((post) => {
        dispatch(deletePost({
            id: post.id,
        }));
        setShowConfirmDelete(false);
    }, []);

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Blog Post Example</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Link to="/posts">
                            <Button>
                                <FilePlus size={18} /> <span>New</span>
                            </Button>
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                {posts.map(post => {
                    let className = "mb-2 post-card";
                    if(post.pinned)
                        className = "mb-2 post-card post-card-pinned"
                    return (
                    <Card key={post.id} className={className}>
                        <Card.Body>
                            <PostHeader post={post} />
                            <PostBody post={post} />
                            <PostFooter
                                post={post}
                                onDelete={() => onPostDelete(post)}
                                onPin={() => onPostPin(post)}
                            />
                        </Card.Body>
                    </Card>
                )})}
            </Container>

            <ConfirmDeleteModal
                show={showConfirmDelete}
                post={selectedPostForDelete}
                onHide={onConfirmDeleteModalHide}
                onYes={onPostDeleteProceed}
                onNo={onConfirmDeleteModalHide}
            />
        </>
    );
};


export default HomePage;