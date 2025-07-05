export type SourceKey = "zenn" | "qiita";

export const sources: {
  [key in SourceKey]: {
    label: string;
    logo: string;
  };
} = {
  zenn: {
    label: "Zenn",
    logo: "/logos/zenn.svg",
  },
  qiita: {
    label: "Qiita",
    logo: "/logos/qiita.png",
  },
};
