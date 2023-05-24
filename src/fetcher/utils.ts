class Headers {
  headers = {
    Authorization: '',
    Accept: 'text/plain',
    'Content-Type': 'application/json-patch+json',
  };

  setToken(token: string | null) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }
}

export const headers = new Headers();
