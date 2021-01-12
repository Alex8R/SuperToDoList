import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
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
            <input onBlur={offEditMode}
                   onChange={onEditTitle}
                   autoFocus
                   type="text"
                   value={title}/>
            :
            <span onDoubleClick={onEditMode}>
                {title}
            </span>
    )
}

export default EditableSpan