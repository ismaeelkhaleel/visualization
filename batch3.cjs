const fs = require('fs');

function write(name, code, algo) {
  const codeLines = code.split('\n').map(l => "  '" + l.replace(/'/g, "\\'") + "',").join('\n');
  fs.writeFileSync('src/data/' + name + 'Code.ts', "export const " + name + "Code = [\n" + codeLines + "\n]\n");
  fs.writeFileSync('src/algorithms/' + name + '.ts', algo);
}

write('validParentheses',
`class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
`import type { VisualizationStep, StackItem } from './types'
export function validParentheses(s: string): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = s.split('').map((v, i) => ({ id: i, value: v }))
  const stack: StackItem[] = []
  let nextId = 0
  steps.push({ codeLine: 2, message: 'Initialize empty stack', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i].value
    steps.push({ codeLine: 4, message: \`Check character '\${char}'\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    if (char === '(' || char === '{' || char === '[') {
      stack.push({ id: nextId++, value: char })
      steps.push({ codeLine: 5, message: \`Push '\${char}' to stack\`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    } else {
      if (stack.length === 0) {
        steps.push({ codeLine: 8, message: 'Stack is empty, invalid parentheses!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
        return steps
      }
      const top = stack.pop()!
      steps.push({ codeLine: 9, message: \`Pop top of stack: '\${top.value}'\`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }] })
      
      const isMatch = (char === ')' && top.value === '(') || (char === '}' && top.value === '{') || (char === ']' && top.value === '[')
      if (!isMatch) {
        steps.push({ codeLine: 10, message: \`Mismatch! '\${top.value}' does not match '\${char}'\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
        return steps
      } else {
        steps.push({ codeLine: 10, message: 'Parentheses match', audioEvent: 'match', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
      }
    }
  }
  const isValid = stack.length === 0
  steps.push({ codeLine: 15, message: isValid ? 'All parentheses matched!' : 'Stack not empty, invalid!', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  return steps
}`);

write('evaluateRPN',
`class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String t : tokens) {
            if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                if (t.equals("+")) stack.push(a + b);
                else if (t.equals("-")) stack.push(a - b);
                else if (t.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
`import type { VisualizationStep, StackItem } from './types'
export function evaluateRPN(tokens: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = tokens.map((v, i) => ({ id: i, value: v }))
  const stack: StackItem[] = []
  let nextId = 0
  steps.push({ codeLine: 2, message: 'Initialize stack', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  for (let i = 0; i < arr.length; i++) {
    const t = arr[i].value
    steps.push({ codeLine: 4, message: \`Process token '\${t}'\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    if (['+', '-', '*', '/'].includes(t)) {
      const b = parseInt(stack.pop()!.value as string)
      steps.push({ codeLine: 6, message: \`Pop b = \${b}\`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }] })
      const a = parseInt(stack.pop()!.value as string)
      steps.push({ codeLine: 7, message: \`Pop a = \${a}\`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }] })
      
      let res = 0
      if (t === '+') res = a + b
      else if (t === '-') res = a - b
      else if (t === '*') res = a * b
      else res = Math.trunc(a / b)
      
      stack.push({ id: nextId++, value: res.toString() })
      steps.push({ codeLine: 8, message: \`Push result \${a} \${t} \${b} = \${res}\`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i] } }, { type: 'stack', data: { items: [...stack] } }] })
    } else {
      stack.push({ id: nextId++, value: t })
      steps.push({ codeLine: 13, message: \`Push number \${t}\`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }] })
    }
  }
  steps.push({ codeLine: 16, message: \`Final result: \${stack[0].value}\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }] })
  return steps
}`);

write('minStack',
`class MinStack {
    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();
    
    public void push(int val) {
        stack.push(val);
        int currentMin = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
        minStack.push(currentMin);
    }
    
    public void pop() {
        stack.pop();
        minStack.pop();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}`,
`import type { VisualizationStep, StackItem } from './types'
export function minStack(ops: string[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const main: StackItem[] = []
  const min: StackItem[] = []
  let nextId = 0
  steps.push({ codeLine: 2, message: 'Initialize MinStack', audioEvent: 'pointer', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
  
  for (const op of ops) {
    if (op.startsWith('push')) {
      const val = parseInt(op.split(' ')[1])
      steps.push({ codeLine: 5, message: \`Push \${val}\`, audioEvent: 'push', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
      main.push({ id: nextId, value: val.toString() })
      const minVal = min.length === 0 ? val : Math.min(val, parseInt(min[min.length - 1].value as string))
      min.push({ id: nextId++, value: minVal.toString() })
      steps.push({ codeLine: 8, message: \`Pushed \${val} to main, \${minVal} to minStack\`, audioEvent: 'push', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
    } else if (op === 'pop') {
      steps.push({ codeLine: 11, message: 'Pop', audioEvent: 'pop', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
      main.pop()
      min.pop()
      steps.push({ codeLine: 13, message: 'Popped from both stacks', audioEvent: 'pop', elements: [{ type: 'stack', data: { items: [...main], action: 'pop' } }, { type: 'stack', data: { items: [...min], action: 'pop' } }] })
    } else if (op === 'getMin') {
      const minVal = min[min.length - 1].value
      steps.push({ codeLine: 16, message: \`getMin returns \${minVal}\`, audioEvent: 'match', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
    }
  }
  steps.push({ codeLine: 19, message: 'All operations complete', audioEvent: 'success', elements: [{ type: 'stack', data: { items: [...main] } }, { type: 'stack', data: { items: [...min] } }] })
  return steps
}`);

write('dailyTemperatures',
`class Solution {
    public int[] dailyTemperatures(int[] temps) {
        int[] res = new int[temps.length];
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < temps.length; i++) {
            while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
                int idx = stack.pop();
                res[idx] = i - idx;
            }
            stack.push(i);
        }
        return res;
    }
}`,
`import type { VisualizationStep, StackItem } from './types'
export function dailyTemperatures(temps: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const arr = temps.map((v, i) => ({ id: i, value: v }))
  const res = new Array(temps.length).fill(0).map((v, i) => ({ id: i + 100, value: v }))
  const stack: StackItem[] = []
  let nextId = 0
  
  steps.push({ codeLine: 2, message: 'Initialize result array & monotonic stack', audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
  
  for (let i = 0; i < temps.length; i++) {
    steps.push({ codeLine: 4, message: \`Process day \${i} with temp \${temps[i]}\`, audioEvent: 'pointer', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
    
    while (stack.length > 0 && temps[i] > temps[parseInt(stack[stack.length - 1].value as string)]) {
      const idx = parseInt(stack.pop()!.value as string)
      steps.push({ codeLine: 7, message: \`Temp \${temps[i]} > \${temps[idx]}. Pop day \${idx}\`, audioEvent: 'pop', elements: [{ type: 'array', data: { values: [...arr], highlights: [i, idx], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack], action: 'pop' } }, { type: 'array', data: { values: [...res] } }] })
      
      res[idx].value = i - idx
      steps.push({ codeLine: 8, message: \`Wait time for day \${idx} is \${i - idx} days\`, audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res], highlights: [idx] } }] })
    }
    stack.push({ id: nextId++, value: i.toString() })
    steps.push({ codeLine: 10, message: \`Push day \${i} to stack\`, audioEvent: 'push', elements: [{ type: 'array', data: { values: [...arr], highlights: [i], pointers: [{label:'i',index:i,position:'top'}] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
  }
  
  steps.push({ codeLine: 12, message: 'Done processing', audioEvent: 'success', elements: [{ type: 'array', data: { values: [...arr] } }, { type: 'stack', data: { items: [...stack] } }, { type: 'array', data: { values: [...res] } }] })
  return steps
}`);

write('reverseLinkedList',
`class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
`import type { VisualizationStep, LinkedListNode } from './types'
export function reverseLinkedList(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  
  const nodes: LinkedListNode[] = nums.map((v, i) => ({ id: i.toString(), value: v, next: (i < nums.length - 1) ? (i + 1).toString() : null }))
  let prev = null
  let curr = '0'
  
  steps.push({ codeLine: 2, message: 'Initialize prev = null, curr = head', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: curr, pointers: [{label:'curr', nodeId:curr}] } }] })
  
  while (curr) {
    const currNode = nodes.find(n => n.id === curr)!
    const next = currNode.next
    steps.push({ codeLine: 5, message: \`Save next node\`, audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: curr, pointers: [{label:'curr', nodeId:curr}, ...(next ? [{label:'next', nodeId:next}] : []), ...(prev ? [{label:'prev', nodeId:prev}] : [])] } }] })
    
    currNode.next = prev
    steps.push({ codeLine: 6, message: \`Reverse curr.next pointer to prev\`, audioEvent: 'swap', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: prev || curr, pointers: [{label:'curr', nodeId:curr}, ...(next ? [{label:'next', nodeId:next}] : []), ...(prev ? [{label:'prev', nodeId:prev}] : [])] } }] })
    
    prev = curr
    curr = next
    steps.push({ codeLine: 8, message: \`Advance prev and curr\`, audioEvent: 'move', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: prev, pointers: [...(curr ? [{label:'curr', nodeId:curr}] : []), ...(prev ? [{label:'prev', nodeId:prev}] : [])] } }] })
  }
  
  steps.push({ codeLine: 11, message: 'Reversal complete', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: prev } }] })
  return steps
}`);

write('mergeTwoSortedLists',
`class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        current.next = l1 != null ? l1 : l2;
        return dummy.next;
    }
}`,
`import type { VisualizationStep, LinkedListNode } from './types'
export function mergeTwoSortedLists(l1: number[], l2: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  
  let id = 0
  const nodes: LinkedListNode[] = [
    { id: 'dummy', value: -1, next: null }
  ]
  const list1Nodes: string[] = []
  for (let i = 0; i < l1.length; i++) {
    const nid = 'l1_' + i; list1Nodes.push(nid)
    nodes.push({ id: nid, value: l1[i], next: (i < l1.length - 1) ? 'l1_' + (i + 1) : null })
  }
  const list2Nodes: string[] = []
  for (let i = 0; i < l2.length; i++) {
    const nid = 'l2_' + i; list2Nodes.push(nid)
    nodes.push({ id: nid, value: l2[i], next: (i < l2.length - 1) ? 'l2_' + (i + 1) : null })
  }
  
  let p1 = list1Nodes[0] || null
  let p2 = list2Nodes[0] || null
  let curr = 'dummy'
  
  steps.push({ codeLine: 2, message: 'Initialize dummy node and pointers', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, ...(p1 ? [{label:'l1', nodeId:p1}] : []), ...(p2 ? [{label:'l2', nodeId:p2}] : [])] } }] })
  
  while (p1 && p2) {
    const n1 = nodes.find(n => n.id === p1)!
    const n2 = nodes.find(n => n.id === p2)!
    steps.push({ codeLine: 5, message: \`Compare \${n1.value} and \${n2.value}\`, audioEvent: 'compare', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, {label:'l2', nodeId:p2}] } }] })
    
    const currNode = nodes.find(n => n.id === curr)!
    if (n1.value as number <= (n2.value as number)) {
      currNode.next = p1
      steps.push({ codeLine: 6, message: \`Link current to \${n1.value}\`, audioEvent: 'swap', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, {label:'l2', nodeId:p2}] } }] })
      p1 = n1.next
      steps.push({ codeLine: 7, message: 'Advance l1', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, ...(p1 ? [{label:'l1', nodeId:p1}] : []), {label:'l2', nodeId:p2}] } }] })
    } else {
      currNode.next = p2
      steps.push({ codeLine: 9, message: \`Link current to \${n2.value}\`, audioEvent: 'swap', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, {label:'l2', nodeId:p2}] } }] })
      p2 = n2.next
      steps.push({ codeLine: 10, message: 'Advance l2', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy', pointers: [{label:'curr', nodeId:curr}, {label:'l1', nodeId:p1}, ...(p2 ? [{label:'l2', nodeId:p2}] : [])] } }] })
    }
    curr = currNode.next!
  }
  
  const currNode = nodes.find(n => n.id === curr)!
  currNode.next = p1 || p2
  steps.push({ codeLine: 14, message: 'Link remaining list', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: 'dummy' } }] })
  return steps
}`);

write('linkedListCycle',
`class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }
}`,
`import type { VisualizationStep, LinkedListNode } from './types'
export function linkedListCycle(nums: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  if (nums.length === 0) return []
  
  const nodes: LinkedListNode[] = nums.map((v, i) => ({ id: i.toString(), value: v, next: (i < nums.length - 1) ? (i + 1).toString() : null }))
  // create cycle to last node if not empty for visualization purposes since input is an array, we'll link last node to index 1 if possible
  if (nodes.length > 2) {
    nodes[nodes.length - 1].next = '1'
  }
  
  let slow: string | null = '0'
  let fast: string | null = nodes[0].next
  
  steps.push({ codeLine: 3, message: 'Initialize slow and fast pointers', audioEvent: 'pointer', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow', nodeId:slow}, ...(fast ? [{label:'fast', nodeId:fast}] : [])] } }] })
  
  while (slow !== fast) {
    if (!fast) {
      steps.push({ codeLine: 7, message: 'Fast reached end, no cycle', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0' } }] })
      return steps
    }
    const fastNode = nodes.find(n => n.id === fast)!
    if (!fastNode.next) {
      steps.push({ codeLine: 7, message: 'Fast reached end, no cycle', audioEvent: 'success', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0' } }] })
      return steps
    }
    
    steps.push({ codeLine: 6, message: \`Check slow != fast\`, audioEvent: 'compare', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow', nodeId:slow}, {label:'fast', nodeId:fast}] } }] })
    
    const slowNode = nodes.find(n => n.id === slow)!
    slow = slowNode.next
    fast = nodes.find(n => n.id === fastNode.next)!.next
    
    steps.push({ codeLine: 10, message: \`Advance slow by 1, fast by 2\`, audioEvent: 'move', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow', nodeId:slow}, ...(fast ? [{label:'fast', nodeId:fast}] : [])] } }] })
  }
  
  steps.push({ codeLine: 12, message: 'Slow met Fast! Cycle detected!', audioEvent: 'match', elements: [{ type: 'linkedList', data: { nodes: JSON.parse(JSON.stringify(nodes)), headId: '0', pointers: [{label:'slow/fast', nodeId:slow}] } }] })
  return steps
}`);

