import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm (props: AddItemFormPropsType) {
    const [newTitle, setTitle] = useState<string>("");
    const [error, setError] = useState<string>('');

    const addItem = () => {
        const itemTitle = newTitle.trim()
        if (!itemTitle) {
            setError('Title field is required');
            return;
        }
        props.addItem(itemTitle);
        setTitle("");
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError('');
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addItem();
    };

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error &&
            <div className={'error-message'}>{error}</div>}
        </div>
    )
}

export default AddItemForm;