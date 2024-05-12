
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { withStore } from './store';

import HomePage from './pages/home';
import CreatePostPage from './pages/createPost';
import EditPostPage from './pages/editPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<CreatePostPage />} />
        <Route path="/posts/:id" element={<EditPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withStore(App);
