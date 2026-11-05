import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const sortedData = [...props.initialData].sort((a, b) => {
        if (props.sorting === 'ASC') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    return (
        <div>
            {sortedData.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
}

function Item(props: { item: IItem }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(props.item.name);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setValue(props.item.name);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                />
            </div>
        );
    }

    return (
        <div>
            <span
                onClick={() => setIsEditing(true)}
                style={{ cursor: 'pointer' }}
            >
                {value}
            </span>
        </div>
    );
}
