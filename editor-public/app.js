// Constants for better maintainability
const SELECTORS = {
    postTitle: '#postTitle',
    postTags: '#postTags',
    postCategories: '#postCategories',
    postDescription: '#postDescription',
    postPreview: '#postPreview',
    postDateInput: '#postDateInput',
    postLastmod: '#postLastmod',
    postDraft: '#postDraft',
    postPublished: '#postPublished',
    saveBtn: '#saveBtn',
    deleteBtn: '#deleteBtn',
    postsList: '#postsList'
};

const MESSAGES = {
    success: {
        postSaved: 'Post saved successfully',
        postDeleted: 'Post deleted successfully',
        imageUploaded: 'Image uploaded successfully'
    },
    error: {
        noPostSelected: 'No post selected',
        enterTitle: 'Please enter a title',
        saveFailed: 'Error saving post',
        deleteFailed: 'Error deleting post',
        uploadFailed: 'Error uploading image'
    }
};

// Utility functions for timestamp formatting
function formatDateTimeLocal(date) {
    const d = new Date(date);
    const offset = d.getTimezoneOffset() * 60000;
    const localDate = new Date(d.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
}

function formatDateOnly(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

class HexoEditor {
    constructor() {
        this.currentPost = null;
        this.posts = [];
        this.tagsCategories = { tags: [], categories: [] };
        this.initializeEditor();
        this.bindEvents();
        this.loadPosts();
        this.loadTagsCategories();
        this.clearForm();
    }

    initializeEditor() {
        this.easyMDE = new EasyMDE({
            element: document.getElementById('editor'),
            spellChecker: false,
            status: ['lines', 'words', 'cursor'],
            autosave: {
                enabled: true,
                uniqueId: 'hexo-editor',
                delay: 3000,
            },
            toolbar: [
                'bold', 'italic', 'heading', '|',
                'quote', 'unordered-list', 'ordered-list', '|',
                'link', 'image', 'table', '|',
                'preview', 'side-by-side', 'fullscreen', '|',
                'guide'
            ],
            // CodeMirror options to prevent indentation issues
            indentWithTabs: false,
            tabSize: 2,
            lineWrapping: true,
            autofocus: false,
            // Disable smart indentation that can cause issues with Hexo
            smartIndent: false,
            indentUnit: 0
        });

        // Enable drag and drop for images
        this.setupDragAndDrop();
        
        // Auto-save on content change
        this.easyMDE.codemirror.on('change', () => {
            this.markAsChanged();
        });
    }

    bindEvents() {
        document.getElementById('newPostBtn').addEventListener('click', () => this.newPost());
        document.getElementById('saveBtn').addEventListener('click', () => this.savePost());
        document.getElementById('deleteBtn').addEventListener('click', () => this.deletePost());
        document.getElementById('previewBtn').addEventListener('click', () => this.previewPost());
        document.getElementById('closePreview').addEventListener('click', () => this.closePreview());
        document.getElementById('postTitle').addEventListener('input', () => this.markAsChanged());
        document.getElementById('postTags').addEventListener('input', () => this.markAsChanged());
        document.getElementById('postCategories').addEventListener('input', () => this.markAsChanged());
        document.getElementById('postDescription').addEventListener('input', () => this.markAsChanged());
        document.getElementById('postDraft').addEventListener('change', () => this.markAsChanged());
        document.getElementById('postPublished').addEventListener('change', () => this.markAsChanged());
        document.getElementById('postDateInput').addEventListener('change', () => this.markAsChanged());
        document.getElementById('postLastmod').addEventListener('change', () => this.markAsChanged());
        document.getElementById('postPreview').addEventListener('input', () => this.markAsChanged());
        document.getElementById('searchPosts').addEventListener('input', (e) => this.filterPosts(e.target.value));
        document.getElementById('imageUpload').addEventListener('change', (e) => this.handleImageUpload(e));
        
        // Toggle checkboxes
        document.getElementById('toggleTagsList').addEventListener('click', () => this.toggleCheckboxList('tagsCheckboxes'));
        document.getElementById('toggleCategoriesList').addEventListener('click', () => this.toggleCheckboxList('categoriesCheckboxes'));

        // Save shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.savePost();
            }
        });
    }

    async loadPosts() {
        try {
            const response = await fetch('/api/posts');
            const result = await response.json();
            this.posts = result.success ? result.data : result; // Handle both old and new format
            this.renderPostsList();
        } catch (error) {
            console.error('Error loading posts:', error);
            this.showNotification('Error loading posts', 'error');
        }
    }

    renderPostsList() {
        const container = document.getElementById('postsList');
        container.innerHTML = '';

        this.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = `post-item cursor-pointer p-3 rounded-lg border ${post.draft ? 'draft' : 'published'}`;
            
            postElement.innerHTML = `
                <div class="font-medium text-gray-800 truncate">${post.title}</div>
                <div class="text-sm text-gray-500 mt-1">
                    ${new Date(post.date).toLocaleDateString()}
                    <span class="ml-2 px-2 py-1 text-xs rounded ${post.draft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${post.draft ? 'Draft' : 'Published'}
                    </span>
                </div>
            `;

            postElement.addEventListener('click', () => this.loadPost(post.filename));
            container.appendChild(postElement);
        });
    }

    filterPosts(query) {
        const filtered = this.posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        
        const container = document.getElementById('postsList');
        container.innerHTML = '';
        
        filtered.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = `post-item cursor-pointer p-3 rounded-lg border ${post.draft ? 'draft' : 'published'}`;
            
            postElement.innerHTML = `
                <div class="font-medium text-gray-800 truncate">${post.title}</div>
                <div class="text-sm text-gray-500 mt-1">
                    ${new Date(post.date).toLocaleDateString()}
                    <span class="ml-2 px-2 py-1 text-xs rounded ${post.draft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${post.draft ? 'Draft' : 'Published'}
                    </span>
                </div>
            `;

            postElement.addEventListener('click', () => this.loadPost(post.filename));
            container.appendChild(postElement);
        });
    }

    async loadPost(filename) {
        try {
            const response = await fetch(`/api/posts/${filename}`);
            const result = await response.json();
            const postData = result.success ? result.data : result; // Handle both formats
            
            this.currentPost = { ...postData, filename };
            
            // Populate all form fields
            document.getElementById('postTitle').value = postData.frontmatter.title || '';
            document.getElementById('postTags').value = Array.isArray(postData.frontmatter.tags) 
                ? postData.frontmatter.tags.join(', ') 
                : (postData.frontmatter.tags || '');
            document.getElementById('postCategories').value = Array.isArray(postData.frontmatter.categories) 
                ? postData.frontmatter.categories.join(', ') 
                : (postData.frontmatter.categories || '');
            document.getElementById('postDescription').value = postData.frontmatter.description || '';
                document.getElementById('postPreview').value = postData.frontmatter.preview || '';
            
            // Handle draft/published status
            const isDraft = postData.frontmatter.draft || false;
            document.getElementById('postDraft').checked = isDraft;
            document.getElementById('postPublished').checked = !isDraft;
            
            // Handle date
            if (postData.frontmatter.date) {
                const date = new Date(postData.frontmatter.date);
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                document.getElementById('postDateInput').value = localDate.toISOString().slice(0, 16);
            }
            
            // Handle lastmod
            if (postData.frontmatter.lastmod) {
                const date = new Date(postData.frontmatter.lastmod);
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                document.getElementById('postLastmod').value = localDate.toISOString().slice(0, 10);
            }
            
            this.easyMDE.value(postData.content || '');
            
            this.updatePostStatus(postData.frontmatter);
            this.markAsClean();
            document.getElementById('deleteBtn').disabled = false;
            
        } catch (error) {
            console.error('Error loading post:', error);
            this.showNotification('Error loading post', 'error');
        }
    }

    async newPost() {
        const title = prompt('Enter post title:');
        if (!title) return;

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content: '' })
            });

            const result = await response.json();
            if (result.success) {
                // Set up new post immediately for editing
                this.currentPost = {
                    filename: result.filename,
                    frontmatter: {
                        title: title,
                        date: new Date().toISOString(),
                        tags: [],
                        categories: [],
                        draft: true
                    },
                    content: ''
                };
                
                // Populate form fields
                document.getElementById('postTitle').value = title;
                document.getElementById('postTags').value = '';
                document.getElementById('postCategories').value = '';
                document.getElementById('postDescription').value = '';
                document.getElementById('postDraft').checked = true;
                this.easyMDE.value('');
                
                // Update status display
                document.getElementById('postStatus').textContent = 'Draft';
                document.getElementById('postStatus').className = 'text-yellow-600';
                document.getElementById('postDate').textContent = new Date().toLocaleDateString();
                
                this.markAsChanged();
                await this.loadPosts();
                this.showNotification('New post created', 'success');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            this.showNotification('Error creating post', 'error');
        }
    }

    async savePost() {
        if (!this.currentPost) {
            this.showNotification('No post selected', 'error');
            return;
        }

        const title = document.getElementById('postTitle').value.trim();
        const rawContent = this.easyMDE.value();
        // Clean up any unwanted indentation that could break Hexo rendering
        const content = this.cleanMarkdownContent(rawContent);

        if (!title) {
            this.showNotification('Please enter a title', 'error');
            return;
        }

        try {
            // Collect all frontmatter data
            const tags = document.getElementById('postTags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);
            
            const categories = document.getElementById('postCategories').value
                .split(',')
                .map(cat => cat.trim())
                .filter(cat => cat.length > 0);
            
            const description = document.getElementById('postDescription').value.trim();
            const preview = document.getElementById('postPreview').value.trim();
            const draft = document.getElementById('postDraft').checked;
            const dateInput = document.getElementById('postDateInput').value;
            const lastmodInput = document.getElementById('postLastmod').value;

            // Auto-update lastmod if field is empty or not manually changed
            const shouldAutoUpdateLastmod = !lastmodInput || 
                lastmodInput === formatDateOnly(this.currentPost.frontmatter.lastmod || new Date()) ||
                lastmodInput === formatDateOnly(new Date());
            
            const frontmatter = {
                ...this.currentPost.frontmatter,
                title,
                tags: tags.length > 0 ? tags : undefined,
                categories: categories.length > 0 ? categories : undefined,
                description: description || undefined,
                preview: preview || undefined,
                draft: draft,
                date: dateInput ? new Date(dateInput).toISOString() : (this.currentPost.frontmatter.date || new Date().toISOString()),
                lastmod: shouldAutoUpdateLastmod ? formatDateOnly(new Date()) : lastmodInput
            };

            // Remove undefined values
            Object.keys(frontmatter).forEach(key => 
                frontmatter[key] === undefined && delete frontmatter[key]
            );

            const response = await fetch(`/api/posts/${this.currentPost.filename}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ frontmatter, content })
            });

            if (response.ok) {
                this.markAsClean();
                this.showNotification('Post saved successfully', 'success');
                await this.loadPosts();
            }
        } catch (error) {
            console.error('Error saving post:', error);
            this.showNotification('Error saving post', 'error');
        }
    }

    async previewPost() {
        const content = this.easyMDE.value();
        
        if (!content.trim()) {
            document.getElementById('previewContent').innerHTML = '<p class="text-gray-500 italic">No content to preview. Start writing in the editor!</p>';
            document.getElementById('previewModal').classList.remove('hidden');
            return;
        }
        
        // Simple client-side markdown rendering for now
        let html = content
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            .replace(/!\[([^\]]*)\]\(([^\)]+)\)/gim, '<img alt="$1" src="$2" class="max-w-full h-auto" />')
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" class="text-blue-600 hover:text-blue-800">$1</a>')
            .replace(/```([\s\S]*?)```/gim, '<pre class="bg-gray-100 p-4 rounded"><code>$1</code></pre>')
            .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-1 rounded">$1</code>')
            .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        // Wrap in paragraphs
        html = '<p>' + html + '</p>';
        
        // Fix empty paragraphs
        html = html.replace(/<p><\/p>/g, '').replace(/<p><h([1-6])>/g, '<h$1>').replace(/<\/h([1-6])><\/p>/g, '</h$1>');
        
        document.getElementById('previewContent').innerHTML = `<div class="prose prose-lg max-w-none">${html}</div>`;
        document.getElementById('previewModal').classList.remove('hidden');
    }

    closePreview() {
        document.getElementById('previewModal').classList.add('hidden');
    }

    setupDragAndDrop() {
        const codeMirror = this.easyMDE.codemirror.getWrapperElement();
        
        codeMirror.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            codeMirror.classList.add('bg-blue-50');
        });

        codeMirror.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            codeMirror.classList.remove('bg-blue-50');
        });

        codeMirror.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            codeMirror.classList.remove('bg-blue-50');

            const files = Array.from(e.dataTransfer.files);
            const imageFiles = files.filter(file => file.type.startsWith('image/'));

            if (imageFiles.length > 0) {
                imageFiles.forEach(file => this.uploadImageFile(file));
            }
        });
    }

    triggerImageUpload() {
        document.getElementById('imageUpload').click();
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.uploadImageFile(file);
        }
    }

    async uploadImageFile(file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                const cursor = this.easyMDE.codemirror.getCursor();
                const imageMarkdown = `![${file.name}](${result.url})`;
                this.easyMDE.codemirror.replaceRange(imageMarkdown, cursor);
                this.showNotification('Image uploaded successfully', 'success');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            this.showNotification('Error uploading image', 'error');
        }
    }

    async uploadImage(file, onSuccess, onError) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                onSuccess(result.url);
            } else {
                onError(result.error || 'Upload failed');
            }
        } catch (error) {
            onError(error.message);
        }
    }

    updatePostStatus(frontmatter) {
        const statusEl = document.getElementById('postStatus');
        const dateEl = document.getElementById('postDate');
        
        statusEl.textContent = frontmatter.draft ? 'Draft' : 'Published';
        statusEl.className = frontmatter.draft ? 'text-yellow-600' : 'text-green-600';
        
        if (frontmatter.date) {
            dateEl.textContent = new Date(frontmatter.date).toLocaleDateString();
        }
    }

    markAsChanged() {
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save*';
        saveBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        saveBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }

    markAsClean() {
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save';
        saveBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        saveBtn.classList.add('bg-green-600', 'hover:bg-green-700');
    }

    clearForm() {
        const now = new Date();
        
        document.getElementById('postTitle').value = '';
        document.getElementById('postTags').value = '';
        document.getElementById('postCategories').value = '';
        document.getElementById('postDescription').value = '';
        document.getElementById('postPreview').value = '';
        document.getElementById('postDraft').checked = true;
        document.getElementById('postPublished').checked = false;
        
        // Auto-set current timestamp for new posts
        document.getElementById('postDateInput').value = formatDateTimeLocal(now);
        document.getElementById('postLastmod').value = formatDateOnly(now);
        
        this.easyMDE.value('');
        
        document.getElementById('postStatus').textContent = 'New Post';
        document.getElementById('postStatus').className = 'text-gray-600';
        document.getElementById('postDate').textContent = '';
        
        this.currentPost = null;
        this.markAsClean();
        document.getElementById('deleteBtn').disabled = true;
    }

    async deletePost() {
        if (!this.currentPost) {
            this.showNotification('No post selected', 'error');
            return;
        }

        const postTitle = document.getElementById('postTitle').value || this.currentPost.filename;
        
        if (confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
            try {
                const response = await fetch(`/api/posts/${this.currentPost.filename}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    this.showNotification('Post deleted successfully', 'success');
                    this.clearForm();
                    await this.loadPosts();
                    document.getElementById('deleteBtn').disabled = true;
                } else {
                    this.showNotification('Error deleting post', 'error');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                this.showNotification('Error deleting post', 'error');
            }
        }
    }

    async loadTagsCategories() {
        try {
            const response = await fetch('/api/tags-categories');
            this.tagsCategories = await response.json();
            this.populateTagsCheckboxes();
            this.populateCategoriesCheckboxes();
        } catch (error) {
            console.error('Error loading tags and categories:', error);
        }
    }

    populateTagsCheckboxes() {
        const container = document.getElementById('tagsCheckboxes');
        container.innerHTML = '';
        
        if (this.tagsCategories.tags && this.tagsCategories.tags.length > 0) {
            this.tagsCategories.tags.forEach(tag => {
                const checkbox = this.createCheckboxItem(tag, 'tag');
                container.appendChild(checkbox);
            });
        } else {
            container.innerHTML = '<p class="text-sm text-gray-500 italic">No tags found in existing posts</p>';
        }
    }

    populateCategoriesCheckboxes() {
        const container = document.getElementById('categoriesCheckboxes');
        container.innerHTML = '';
        
        if (this.tagsCategories.categories && this.tagsCategories.categories.length > 0) {
            this.tagsCategories.categories.forEach(category => {
                const checkbox = this.createCheckboxItem(category, 'category');
                container.appendChild(checkbox);
            });
        } else {
            container.innerHTML = '<p class="text-sm text-gray-500 italic">No categories found in existing posts</p>';
        }
    }

    createCheckboxItem(item, type) {
        const div = document.createElement('div');
        div.className = 'flex items-center';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${type}-${item.value}`;
        checkbox.className = 'mr-2 text-blue-600';
        checkbox.addEventListener('change', () => this.handleCheckboxChange(type));
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.className = 'text-sm text-gray-700 cursor-pointer';
        label.textContent = item.label;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        
        return div;
    }

    toggleCheckboxList(containerId) {
        const container = document.getElementById(containerId);
        const button = containerId === 'tagsCheckboxes' ? 
            document.getElementById('toggleTagsList') : 
            document.getElementById('toggleCategoriesList');
        
        if (container.classList.contains('hidden')) {
            container.classList.remove('hidden');
            button.textContent = 'Hide Options';
        } else {
            container.classList.add('hidden');
            button.textContent = 'Show Options';
        }
    }

    handleCheckboxChange(type) {
        const inputField = document.getElementById(type === 'tag' ? 'postTags' : 'postCategories');
        const checkboxes = document.querySelectorAll(`input[id^="${type}-"]:checked`);
        
        const selectedValues = Array.from(checkboxes).map(cb => {
            const itemValue = cb.id.replace(`${type}-`, '');
            return this.tagsCategories[type === 'tag' ? 'tags' : 'categories']
                .find(item => item.value === itemValue)?.value || '';
        }).filter(value => value);
        
        inputField.value = selectedValues.join(', ');
        this.markAsChanged();
    }

    cleanMarkdownContent(content) {
        if (!content) return content;
        
        // Split content into lines
        const lines = content.split('\n');
        const cleanedLines = [];
        
        for (let line of lines) {
            // Remove leading tabs and excessive spaces that could cause Hexo rendering issues
            // Preserve intentional code blocks (4+ spaces) but clean up editor artifacts
            if (line.match(/^[\s\t]+/) && !line.match(/^    [^\s]/)) {
                // This line has leading whitespace but isn't a proper code block
                // Remove all leading whitespace that might be editor artifacts
                line = line.replace(/^[\s\t]+/, '');
            }
            cleanedLines.push(line);
        }
        
        return cleanedLines.join('\n');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the editor when DOM is loaded
function initializeEditor() {
    try {
        window.hexoEditor = new HexoEditor();
        console.log('✅ HexoEditor initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing HexoEditor:', error);
        // Retry after a short delay
        setTimeout(initializeEditor, 1000);
    }
}

document.addEventListener('DOMContentLoaded', initializeEditor);

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEditor);
} else {
    initializeEditor();
}