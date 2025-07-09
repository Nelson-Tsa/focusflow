const request = require('supertest');
const express = require('express');

let app;
let server;

beforeAll(() => {
  app = require('../index');
  server = app.listen(4000);
});
afterAll(() => {
  server.close();
});

describe('API Tasks', () => {
  let taskId;

  it('POST /api/tasks crée une tâche', async () => {
    const res = await request(server)
      .post('/api/tasks')
      .send({ title: 'Test API' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test API');
    taskId = res.body.id;
  });

  it('GET /api/tasks retourne la liste', async () => {
    const res = await request(server).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.tasks || res.body)).toBe(true);
  });

  it('PUT /api/tasks/:id modifie une tâche', async () => {
    const res = await request(server)
      .put(`/api/tasks/${taskId}`)
      .send({ done: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);
  });

  it('GET /api/tasks/search?q=Test', async () => {
    const res = await request(server).get('/api/tasks/search?q=Test');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/tasks?page=1&limit=1', async () => {
    const res = await request(server).get('/api/tasks?page=1&limit=1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(1);
  });

  it('DELETE /api/tasks/:id supprime une tâche', async () => {
    const res = await request(server).delete(`/api/tasks/${taskId}`);
    expect([200, 204]).toContain(res.statusCode);
  });
}); 