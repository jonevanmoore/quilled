import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

export default function IndieNote() {
    const { noteId } = useParams()

    return (
        <h2>Indie Note</h2>
    )
}
