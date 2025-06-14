import type { Link, User } from '@/types';
import useAuthStore from './zustand/useAuthStore';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface CreateLinkData {
  title: string;
  url: string;
  tags: string[];
}

const backendUrl = import.meta.env.VITE_LINKVALUT_BACKEND;

const getAuthHeader = (): Record<string, string> => {
  const token = useAuthStore.getState().getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const RegisterUser = async (formData: RegisterFormData): Promise<{ success: boolean; message: string; user: User; token: string }> => {
  const response = await fetch(`${backendUrl}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.error  || 'Registration failed',
      user: {} as User,
      token: ""
    };
  }

  const data = await response.json();
  return {
    success: true,
    message: data.message,
    user: data.user as User,
    token: data.token
  };
};

const LoginUser = async (username: string, password: string): Promise<{ success: boolean; token: string; user: User , message: string}> => {
  const response = await fetch(`${backendUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }); 

  if (!response.ok) {
    const errorData = await response.json();

    return {
      success: false,
      token: "",
      user: {} as User,
      message: errorData.error || 'Login failed',
    };
  }

  const data = await response.json();

  return {
    success: true,
    token: data.token,
    user: data.user as User,
    message: data.message,
  };
};

const GetLinks = async (tag?: string | string[]): Promise<Link[]> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };

  let url = `${backendUrl}/api/links`;
  if (tag) {
    const queryParams = new URLSearchParams();
    if (Array.isArray(tag)) {
      tag.forEach(t => queryParams.append('tag', t));
    } else {
      queryParams.append('tag', tag);
    }
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch links');
  }

  const data = await response.json();
  return data as Link[];
};

const CreateLink = async (linkData: CreateLinkData): Promise<{ message: string; link: Link }> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };

  const response = await fetch(`${backendUrl}/api/links`, {
    method: 'POST',
    headers,
    body: JSON.stringify(linkData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create link');
  }

  const data = await response.json();
  return {
    message: data.message,
    link: data.link as Link,
  };
};

const DeleteLink = async (id: string): Promise<{ message: string }> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };

  const response = await fetch(`${backendUrl}/api/links/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete link');
  }

  const data = await response.json();
  return {
    message: data.message,
  };
};

export { RegisterUser, LoginUser, GetLinks, CreateLink, DeleteLink };
