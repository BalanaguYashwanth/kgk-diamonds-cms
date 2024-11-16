import { paths } from "./constants";
import { encapsulateMethodHeader, handleAPIResponse } from "./helper";

export const createPosts = async (data) => {
    const response = await fetch('api/posts', {
        ...encapsulateMethodHeader('POST'),
        body: JSON.stringify(data)
    });
    return handleAPIResponse(response)
};

export const fetchPosts = async () => {
    const response = await fetch('api/posts', { ...encapsulateMethodHeader('GET') });
    return handleAPIResponse(response)
};

export const fetchPostBySlug = async (slug) => {
    const response = await fetch(`/api/${paths.posts}/${slug}`, { ...encapsulateMethodHeader('GET') });
    return handleAPIResponse(response)
};

export const updatePostBySlug = async (slug, data) => {
    const response = await fetch(`/api/${paths.posts}/${slug}`, {
        ...encapsulateMethodHeader('PUT'),
        body: JSON.stringify(data)
    });
    return handleAPIResponse(response)
};

export const deletePostById = async (id) => {
    const response = await fetch(`/api/${paths.posts}/${id}`, { ...encapsulateMethodHeader('DELETE') });
    return handleAPIResponse(response)
};