export const dfsCode = [
  'class Solution {',
  '    public void dfs(Node node, HashSet<Node> visited) {',
  '        if (node == null || visited.contains(node)) return;',
  '        visited.add(node);',
  '        for (Node neighbor : node.neighbors) {',
  '            dfs(neighbor, visited);',
  '        }',
  '    }',
  '}',
]
