const PostTable = ({myPosts, handleEdit, handleDelete}) => {
    return(
        <table className='posts-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                {
                    myPosts.length && myPosts?.map((post, index) => (
                        <tr key={`post-${index}`}>
                            <td>{post.title}</td>
                            <td>{post.slug}</td>
                            <th>
                                <button onClick={()=>handleEdit(post.slug)}>✏️</button>
                                <button onClick={()=>handleDelete(post.id)}>🗑️</button>
                            </th>
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )
}

export default PostTable;