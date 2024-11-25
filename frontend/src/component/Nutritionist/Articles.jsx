import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Box, Dialog, DialogContent, TextField, Button } from '@mui/material';
import { Articlecard } from './Articlecard';
import Newarticleform from './Newarticleform';
import { getArticles, getArticleById, updateArticle } from '../State/Articles/Action'; // Import actions

function Articles() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null); // State for the article being edited
  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt'); // Get JWT token from localStorage

  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticles(token));
  }, [dispatch, token]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleArticleCreated = () => {
    setSelectedTab(0); // Switch to the "Articles" tab after an article is created
  };

  const handleEditButtonClick = (articleId) => {
    dispatch(getArticleById(token, articleId))
      .then((response) => {
        console.log("article", response)
        setEditingArticle(response); // Ensure the action returns the article data in the payload
        setEditDialogOpen(true); // Open the dialog
      })
      .catch((err) => {
        console.error('Error fetching article for editing:', err);
      });
  };


  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setEditingArticle(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingArticle((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box className="mt-5 px-5">
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Articles" />
        <Tab label="New Article" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p>Error fetching articles: {error.message || 'An unexpected error occurred'}</p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {articles.map((article) => (
              <Articlecard
                key={article.id}
                image={article.image}
                title={article.title}
                content={article.content}
                publishedDate={article.publishedDate}
                author={article.author}
                onEdit={() => handleEditButtonClick(article.id)} // Pass edit handler
              />
            ))}
          </div>
        )}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Box sx={{ mt: 2 }}>
          <Newarticleform onArticleCreated={handleArticleCreated} />
        </Box>
      </TabPanel>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose} maxWidth="md">
        <DialogContent className="flex">
          {/* Left: Image */}
          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            {editingArticle?.image ? (
              <img
                src={
                  typeof editingArticle.image === 'string'
                    ? `data:image/png;base64,${editingArticle.image}`
                    : URL.createObjectURL(editingArticle.image) // Preview for new image
                }
                alt={editingArticle.title}
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </Box>

          {/* Right: Form */}
          <Box flex={1} ml={2}>
            <TextField
              label="Title"
              name="title"
              value={editingArticle?.title || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content"
              name="content"
              value={editingArticle?.content || ''}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={6}
              margin="normal"
            />
            <Box mt={2}>
              <label htmlFor="image-upload">Change Image:</label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setEditingArticle((prev) => ({
                      ...prev,
                      image: file, // Update the image with the new file
                    }));
                  }
                }}
                style={{ marginTop: '8px' }}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  if (!editingArticle) return;

                  const formData = new FormData();
                  formData.append('title', editingArticle.title || '');
                  formData.append('content', editingArticle.content || '');
                  if (editingArticle.image instanceof File) {
                    formData.append('image', editingArticle.image);
                  }

                  dispatch(updateArticle(token, editingArticle.id, formData))
                    .then(() => {
                      console.log('Article updated successfully!');
                      // Fetch the updated articles
                      dispatch(getArticles(token));
                      handleDialogClose();
                    })
                    .catch((error) => {
                      console.error('Error updating article:', error);
                    });
                }}
              >
                Save
              </Button>


            </Box>
          </Box>
        </DialogContent>
      </Dialog>

    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default Articles;
