interface TimelineStatusModel {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  icon?: React.ReactNode;
}

interface TimelineItem {
  id: string;
  date: Date | string;
  title: string;
  description: string;
  attribute: string;
  status?: TimelineStatusModel;
  isCompleted: boolean;
  tags?: Tag[];
}

interface Tag {
    id: string,
    label: string,
    color: string
}
