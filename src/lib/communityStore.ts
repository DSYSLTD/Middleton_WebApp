export interface EnterpriseComment {
  id: string;
  postSlug: string;
  postTitle?: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: 'Approved' | 'Pending' | 'Spam' | 'Trash';
  postedDate: string;
  likes?: number;
}

const STORAGE_KEY = 'neema_community_comments';

const INITIAL_COMMENTS: EnterpriseComment[] = [
  {
    id: 'comm-1',
    postSlug: 'empowering-rural-women-micro-credit',
    postTitle: 'Empowering Rural Women Through Targeted Micro-Credit Initiatives',
    authorName: 'Grace Wambui',
    authorEmail: 'gwambui@gmail.com',
    content: 'The table-banking model highlighted here transformed our poultry venture in Nyeri. Very insightful breakdown!',
    status: 'Approved',
    postedDate: 'March 2, 2026',
    likes: 4
  },
  {
    id: 'comm-2',
    postSlug: 'scaling-agribusiness-value-chains',
    postTitle: 'Scaling Agribusiness in Mount Kenya: Capital Solutions for Smallholders',
    authorName: 'John Kamau',
    authorEmail: 'jkamau.dairy@gmail.com',
    content: 'Flexible repayment terms during the dry spell helped us maintain milk production with zero default.',
    status: 'Approved',
    postedDate: 'March 3, 2026',
    likes: 6
  }
];

export const communityStore = {
  getComments(): EnterpriseComment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMENTS));
        return INITIAL_COMMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_COMMENTS;
    }
  },

  saveComments(comments: EnterpriseComment[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
      window.dispatchEvent(new CustomEvent('neema_cms_comments_updated'));
      window.dispatchEvent(new CustomEvent('neema_cms_posts_updated'));
    } catch (e) {
      console.error(e);
    }
  },

  addComment(params: {
    postSlug: string;
    postTitle?: string;
    authorName: string;
    authorEmail: string;
    content: string;
    status?: 'Approved' | 'Pending';
  }): EnterpriseComment {
    const comments = this.getComments();
    const newComment: EnterpriseComment = {
      id: `comm-${Date.now()}`,
      postSlug: params.postSlug,
      postTitle: params.postTitle || '',
      authorName: params.authorName,
      authorEmail: params.authorEmail,
      content: params.content,
      status: params.status || 'Approved', // Auto-approved by default for public submission
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0
    };
    const updated = [newComment, ...comments];
    this.saveComments(updated);
    return newComment;
  },

  updateCommentStatus(id: string, status: 'Approved' | 'Pending' | 'Spam' | 'Trash') {
    const comments = this.getComments();
    const updated = comments.map(c => c.id === id ? { ...c, status } : c);
    this.saveComments(updated);
  },

  deleteComment(id: string) {
    const comments = this.getComments();
    const updated = comments.filter(c => c.id !== id);
    this.saveComments(updated);
  }
};
