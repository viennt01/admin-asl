class Headers {
  headers = {
    accessToken: '',
    Accept: 'text/plain',
    'Content-Type': 'application/json-patch+json',
  };

  setToken(token: string | null) {
    this.headers = {
      ...this.headers,
      accessToken: token || '',
    };
  }
}

export const headers = new Headers();
