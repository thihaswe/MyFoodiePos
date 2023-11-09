import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "./config";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `foodie-pos/thiha-swe/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);
