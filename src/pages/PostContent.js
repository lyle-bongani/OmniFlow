import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, IconButton, CircularProgress, Snackbar, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

function PostContent() {
    const [contentType, setContentType] = useState('story');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setVideo(e.target.files[0]);
        }
    };

    const handleTagsChange = (e) => {
        setTags(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleEmojiClick = (event, emojiObject) => {
        setContent(content + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('contentType', contentType);
        formData.append('content', content);
        formData.append('tags', tags);
        formData.append('location', location);
        if (image) {
            formData.append('image', image);
        }
        if (video) {
            formData.append('video', video);
        }

        setLoading(true);

        try {
            const response = await axios.post('https://your-api-endpoint.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post submitted:', response.data);
            setSuccessMessage('Post submitted successfully!');
            // Clear the form after successful submission
            setContentType('story');
            setContent('');
            setTags('');
            setLocation('');
            setImage(null);
            setVideo(null);
        } catch (error) {
            console.error('Error submitting post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContainer>
            <Typography variant="h4" gutterBottom>
                Create a New Post
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Content Type</InputLabel>
                <Select
                    value={contentType}
                    onChange={handleContentTypeChange}
                    label="Content Type"
                >
                    <MenuItem value="story">Story</MenuItem>
                    <MenuItem value="reel">Reel</MenuItem>
                    <MenuItem value="article">Article</MenuItem>
                </Select>
            </FormControl>
            {contentType === 'article' ? (
                <Editor
                    apiKey="your-tinymce-api-key"
                    value={content}
                    onEditorChange={(newContent) => setContent(newContent)}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                />
            ) : (
                <TextField
                    label="What's on your mind?"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={content}
                    onChange={handleContentChange}
                />
            )}
            <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                margin="normal"
                value={tags}
                onChange={handleTagsChange}
            />
            <TextField
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={location}
                onChange={handleLocationChange}
            />
            <Actions>
                <IconButton color="primary" component="label">
                    <PhotoCamera />
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </IconButton>
                {contentType === 'reel' && (
                    <IconButton color="primary" component="label">
                        <VideoLibraryIcon />
                        <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
                    </IconButton>
                )}
                <IconButton color="primary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <EmojiEmotionsIcon />
                </IconButton>
                {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
            </Actions>
            {image && <PreviewImage src={URL.createObjectURL(image)} alt="Preview" />}
            {video && <PreviewVideo src={URL.createObjectURL(video)} controls />}
            <Button variant="contained" color="primary" onClick={handlePost} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Post'}
            </Button>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
                message={successMessage}
            />
        </PostContainer>
    );
}

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
`;

const Actions = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const PreviewImage = styled.img`
    max-width: 100%;
    border-radius: 8px;
    margin-top: 16px;
`;

const PreviewVideo = styled.video`
    max-width: 100%;
    border-radius: 8px;
    margin-top: 16px;
`;

export default PostContent;
