-- CreateExtensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LegalStatus" AS ENUM ('BERLAKU', 'DIUBAH', 'DICABUT', 'TIDAK_BERLAKU');

-- CreateEnum
CREATE TYPE "PublicationState" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SkNature" AS ENUM ('A_INTERNAL', 'B_EXTERNAL');

-- CreateEnum
CREATE TYPE "DatePrecision" AS ENUM ('DAY', 'MONTH');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('MENGUBAH', 'MENCABUT', 'MENGESAHKAN', 'MELAKSANAKAN', 'TERKAIT');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('BARU', 'DIPROSES', 'SELESAI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'PUBLISH', 'UNPUBLISH', 'ARCHIVE', 'RESTORE', 'DELETE', 'STATUS_CHANGE', 'FILE_UPLOAD', 'RELATION_ADD', 'RELATION_REMOVE', 'NUMBER_RESERVE', 'NUMBER_RELEASE', 'NUMBER_OVERRIDE', 'IMPORT', 'USER_CHANGE', 'REQUEST_UPDATE');

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "description" VARCHAR(1000),
    "numberPattern" VARCHAR(120) NOT NULL,
    "numberPadding" SMALLINT NOT NULL,
    "requiresNature" BOOLEAN NOT NULL DEFAULT false,
    "autoSequence" BOOLEAN NOT NULL DEFAULT true,
    "hierarchyLevel" SMALLINT NOT NULL,
    "sortOrder" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "sortOrder" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalDocument" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "typeId" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "officialNumber" VARCHAR(200) NOT NULL,
    "legacyNumber" VARCHAR(200),
    "abbreviationCode" VARCHAR(80),
    "nature" "SkNature",
    "title" VARCHAR(500) NOT NULL,
    "summary" VARCHAR(2000),
    "contentText" TEXT,
    "forumId" TEXT,
    "enactedDate" DATE NOT NULL,
    "enactedDatePrecision" "DatePrecision" NOT NULL DEFAULT 'DAY',
    "romanMonth" VARCHAR(4) NOT NULL,
    "placeOfEnactment" VARCHAR(100) NOT NULL DEFAULT 'Surabaya',
    "legalStatus" "LegalStatus" NOT NULL DEFAULT 'BERLAKU',
    "publicationState" "PublicationState" NOT NULL DEFAULT 'DRAFT',
    "notes" VARCHAR(1000),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "searchVector" tsvector,
    "currentFileId" TEXT,
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "createdBy" VARCHAR(254),
    "updatedBy" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentFile" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "r2Key" VARCHAR(400) NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
    "sizeBytes" INTEGER NOT NULL,
    "sha256" CHAR(64) NOT NULL,
    "extractedText" TEXT,
    "uploadedBy" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRelation" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "type" "RelationType" NOT NULL,
    "note" VARCHAR(500),
    "createdBy" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTag" (
    "documentId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "DocumentTag_pkey" PRIMARY KEY ("documentId","tagId")
);

-- CreateTable
CREATE TABLE "NumberCounter" (
    "typeId" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "NumberCounter_pkey" PRIMARY KEY ("typeId","year")
);

-- CreateTable
CREATE TABLE "NumberReservation" (
    "id" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "purpose" VARCHAR(300),
    "reservedBy" VARCHAR(254),
    "expiresAt" TIMESTAMPTZ(3),
    "documentId" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NumberReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "name" VARCHAR(120),
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorEmail" VARCHAR(254) NOT NULL,
    "action" "AuditAction" NOT NULL,
    "entity" VARCHAR(50) NOT NULL,
    "entityId" VARCHAR(50) NOT NULL,
    "diff" JSONB,
    "ipHash" CHAR(64),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequest" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "affiliation" VARCHAR(120),
    "message" VARCHAR(2000) NOT NULL,
    "relatedDocumentId" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'BARU',
    "adminNote" VARCHAR(1000),
    "handledBy" VARCHAR(254),
    "ipHash" CHAR(64),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DocumentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "key" VARCHAR(128) NOT NULL,
    "windowStart" TIMESTAMPTZ(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("key","windowStart")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_code_key" ON "DocumentType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_slug_key" ON "DocumentType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Forum_name_key" ON "Forum"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Forum_slug_key" ON "Forum"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_slug_key" ON "LegalDocument"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_officialNumber_key" ON "LegalDocument"("officialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_currentFileId_key" ON "LegalDocument"("currentFileId");

-- CreateIndex
CREATE INDEX "LegalDocument_publicationState_typeId_year_idx" ON "LegalDocument"("publicationState", "typeId", "year" DESC);

-- CreateIndex
CREATE INDEX "LegalDocument_publicationState_enactedDate_idx" ON "LegalDocument"("publicationState", "enactedDate" DESC);

-- CreateIndex
CREATE INDEX "LegalDocument_forumId_idx" ON "LegalDocument"("forumId");

-- CreateIndex
CREATE INDEX "LegalDocument_searchVector_idx" ON "LegalDocument" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "LegalDocument_title_trgm_idx" ON "LegalDocument" USING GIN ("title" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "LegalDocument_officialNumber_trgm_idx" ON "LegalDocument" USING GIN ("officialNumber" gin_trgm_ops);

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_typeId_year_sequenceNumber_key" ON "LegalDocument"("typeId", "year", "sequenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentFile_r2Key_key" ON "DocumentFile"("r2Key");

-- CreateIndex
CREATE INDEX "DocumentFile_sha256_idx" ON "DocumentFile"("sha256");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentFile_documentId_version_key" ON "DocumentFile"("documentId", "version");

-- CreateIndex
CREATE INDEX "DocumentRelation_toId_idx" ON "DocumentRelation"("toId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRelation_fromId_toId_type_key" ON "DocumentRelation"("fromId", "toId", "type");

-- CreateIndex
CREATE INDEX "DocumentTag_tagId_idx" ON "DocumentTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "NumberReservation_documentId_key" ON "NumberReservation"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "NumberReservation_typeId_year_sequenceNumber_key" ON "NumberReservation"("typeId", "year", "sequenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_actorEmail_idx" ON "AuditLog"("actorEmail");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "DocumentRequest_status_createdAt_idx" ON "DocumentRequest"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "DocumentRequest_relatedDocumentId_idx" ON "DocumentRequest"("relatedDocumentId");

-- CreateIndex
CREATE INDEX "RateLimit_windowStart_idx" ON "RateLimit"("windowStart");

-- AddForeignKey
ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_currentFileId_fkey" FOREIGN KEY ("currentFileId") REFERENCES "DocumentFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFile" ADD CONSTRAINT "DocumentFile_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRelation" ADD CONSTRAINT "DocumentRelation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRelation" ADD CONSTRAINT "DocumentRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NumberCounter" ADD CONSTRAINT "NumberCounter_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NumberReservation" ADD CONSTRAINT "NumberReservation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NumberReservation" ADD CONSTRAINT "NumberReservation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequest" ADD CONSTRAINT "DocumentRequest_relatedDocumentId_fkey" FOREIGN KEY ("relatedDocumentId") REFERENCES "LegalDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
