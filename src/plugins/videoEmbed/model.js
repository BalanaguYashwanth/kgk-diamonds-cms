export const videoEmbedModel = `
model VideoEmbed {
  id       Int    @id @default(autoincrement())
  postId   Int
  videoUrl String
  createdAt DateTime @default(now())
  
  post     Post   @relation(fields: [postId], references: [id])
}
`;
