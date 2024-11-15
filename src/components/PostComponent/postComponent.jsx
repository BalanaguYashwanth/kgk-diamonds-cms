import './postComponent.css'

const PostComponent = ({title, slug}) => {
    return(
        <tr className='post-container'>
            <td>{title}</td>
            <td>{slug}</td>
        </tr>
    )
}

export default PostComponent;