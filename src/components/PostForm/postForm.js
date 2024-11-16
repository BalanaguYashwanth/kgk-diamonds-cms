import ReactQuill from "react-quill-new";

const PostForm = ({ editorKey, handleFieldChange, post }) => {
    const editorStyle = {
        height: "300px",
        lineHeight: "1.8",
        fontSize: "16px",
        borderRadius: "15px",
    };

    const handleTitleSlug = (e) => {
        handleFieldChange("title", e.target.value)
        handleFieldChange("slug", (e.target.value.split(' ').join('-').toLowerCase()))
    }

    return (
        <>
            <article>
                <p id="bold">Title</p>
                <input
                    onChange={handleTitleSlug}
                    value={post.title}
                />
            </article>
            <article>
                <p id="bold">Slug</p>
                <input
                    onChange={(e) => handleFieldChange("slug", e.target.value)}
                    value={post.slug}
                />
            </article>
            <article className="margin-bottom-spacing">
                <p id="bold">Content</p>
                <ReactQuill
                    key={editorKey}
                    style={editorStyle}
                    onChange={(value) => handleFieldChange("content", value)}
                    value={post.content}
                />
            </article>

        </>
    )
}

export default PostForm;