import React, { ChangeEvent, useState } from 'react';
import { TextField } from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [ editMode, setEditMode ] = useState<boolean>(false)
    const [ title, setTitle ] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) props.changeTitle(title.trim())
    }
    const onEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    return (
        editMode ?
            <TextField
                value={ title }
                onBlur={ offEditMode }
                onChange={ onEditTitle }
                autoFocus/>
            :
            <span onDoubleClick={ onEditMode }>
                { title }
            </span>
    )
})

export default EditableSpan