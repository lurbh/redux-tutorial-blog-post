import { nanoid } from '@reduxjs/toolkit';
import moment from 'moment';

export const mockedPosts = [
    {
        id: nanoid(),
        createdAt: moment("2024-05-01T08:00:00Z").valueOf(),
        updatedAt: moment("2024-05-01T08:00:00Z").valueOf(),
        title: "First",
        content: "Hello World! This is my first post of the blog!",
        pinned: false
    },
    {
        id: nanoid(),
        createdAt: moment("2024-05-02T08:00:00Z").valueOf(),
        updatedAt: moment("2024-05-02T08:00:00Z").valueOf(),
        title: "New Lines are amazing",
        content: "Here's my second post.\n\nTesting out the new lines lmao.",
        pinned: true
    },
    {
        id: nanoid(),
        createdAt: moment("2024-05-03T08:00:00Z").valueOf(),
        updatedAt: moment("2024-05-03T08:00:00Z").valueOf(),
        title: "Slay",
        content: "This blog totally ate and left no crumbs.",
        pinned: false
    },
];