import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const emojisList = [
    '😀',
    '😄',
    '😆',
    '😂',
    '🙂',
    '🥰',
    '🙂',
    '😚',
    '🥲',
    '😋',
    '😍',
    '😘',
    '😜',
    '😝',
    '😎',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '😣',
    '😖',
    '😫',
    '😩',
    '😠',
    '😡',
    '😢',
    '😭',
    '😤',
    '😪',
    '🤑',
    '🤫',
    '🤔',
    '❤',
    '💔',
    '💖',
    '💗',
    '👋',
    '🤌',
    '🇭🇳',
]

const EmojiPicker = ({ setMessage, setIsEmojiPickerOpen }) => {

    const addEmojiToMessage = (emoji) => {
        setMessage(message => message + ` ${emoji}`);
    };

    return (
        <div className="absolute w-48 h-36 overflow-y-auto shadow-md rounded-lg -top-40 -left-36 md:-left-4">
            <div className="bg-white relative">
                <FontAwesomeIcon onClick={() => setIsEmojiPickerOpen(false)} icon={faTimes} className="cursor-pointer absolute right-4 text-red-500 top-2" />
                <div className="text-stone-800 text-center pt-1">Emojis</div>
                <div className="grid grid-cols-4 text-xl gap-2 p-2 text-center">
                    {emojisList.map((emoji, index) => (
                        <div onClick={() => addEmojiToMessage(emoji)} key={index} className="cursor-pointer hover:bg-gray-100">
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmojiPicker