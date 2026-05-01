export const EBOOK_SIGNED_IN_FREE_CHAPTER_COUNT = 2;
export const EBOOK_ANONYMOUS_FREE_CHAPTER_COUNT = 1;

export function isSignedInPreviewChapter(chapterIndex: number) {
  return chapterIndex >= 0 && chapterIndex < EBOOK_SIGNED_IN_FREE_CHAPTER_COUNT;
}

export function isAnonymousPreviewChapter(chapterIndex: number) {
  return chapterIndex >= 0 && chapterIndex < EBOOK_ANONYMOUS_FREE_CHAPTER_COUNT;
}

export function requiresPreviewSignIn({
  chapterIndex,
  hasPremiumAccess,
  isSignedIn,
}: {
  chapterIndex: number;
  hasPremiumAccess: boolean;
  isSignedIn: boolean;
}) {
  return (
    !isSignedIn &&
    !hasPremiumAccess &&
    isSignedInPreviewChapter(chapterIndex) &&
    !isAnonymousPreviewChapter(chapterIndex)
  );
}
