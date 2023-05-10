class Headers {
  headers = {
    Authorization: '',
    'content-type': 'application/json',
  };

  setToken(token: string | null) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }
}

export const headers = new Headers();
