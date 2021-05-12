export interface MarkDownTypes {
  time: number;
  blocks: Block[];
  version: string;
}

export interface Block {
  type: string;
  data: {
    text?: string;
    level?: number;
    file?: {
      url?: string;
    };
    url: string;
    caption?: string;
    withBorder?: boolean;
    stretched?: boolean;
    withBackground?: boolean;
    style?: string;
    items?: string[];
  };
}
