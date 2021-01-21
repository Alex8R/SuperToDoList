import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [newTitle, setTitle] = useState<string>("");
    const [error, setError] = useState<string>('');

    const addItem = () => {
        const itemTitle = newTitle.trim()
        if (!itemTitle) {
            setError("Title field is required");
            return;
        }
        props.addItem(itemTitle);
        setTitle("");
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addItem();
    };

    return (
        <div>
            <TextField
                variant={"outlined"}
                error={!!error}
                helperText={error}
                label={"Title"}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton
                color="primary"
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;