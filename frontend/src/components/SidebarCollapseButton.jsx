import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function SidebarCollapseButton({ isCollapsed, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="sidebar-collapse-btn hidden lg:flex"
      title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      animate={{ rotate: isCollapsed ? 0 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <motion.span
        key={isCollapsed ? 'collapsed' : 'expanded'}
        initial={{ opacity: 0, x: isCollapsed ? -4 : 4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isCollapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
      </motion.span>
    </motion.button>
  );
}
