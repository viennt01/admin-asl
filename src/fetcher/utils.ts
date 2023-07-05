class Headers {
  headers = {
    accessToken: '',
    ipAddress: '',
    deviceName: '',
    Accept: 'text/plain',
    'Content-Type': 'application/json-patch+json',
  };

  setToken(token: string | null) {
    this.headers = {
      ...this.headers,
      accessToken: token || '',
    };
  }

  setIdAddress(ipAddress: string | null) {
    this.headers = {
      ...this.headers,
      ipAddress: ipAddress || '',
    };
  }

  setDeviceName(deviceName: string | null) {
    this.headers = {
      ...this.headers,
      deviceName: deviceName || '',
    };
  }
}

export const headers = new Headers();
