/** Validate the relationships that make a scene editable, beyond valid JSON. */
export function validateScene(scene) {
  const errors = [];
  if (scene?.type !== 'excalidraw' || scene.version !== 2) errors.push('Expected Excalidraw v2 scene');
  if (!Array.isArray(scene?.elements) || !scene.elements.length) return [...errors, 'Expected nonempty elements'];
  const live = scene.elements.filter(e => !e.isDeleted);
  const ids = new Map();
  for (const e of live) {
    if (!e.id || ids.has(e.id)) errors.push(`Missing or duplicate id: ${e.id}`);
    ids.set(e.id, e);
    for (const field of ['x', 'y', 'width', 'height', 'angle']) if (!Number.isFinite(e[field])) errors.push(`${e.id}: invalid ${field}`);
    if (e.width < 0 || e.height < 0) errors.push(`${e.id}: negative size`);
    if (e.type === 'text' && (typeof e.text !== 'string' || !(e.fontSize > 0))) errors.push(`${e.id}: invalid text`);
    if (['arrow', 'line'].includes(e.type) && (!Array.isArray(e.points) || e.points.length < 2 || e.points.some(p => p.length !== 2 || !p.every(Number.isFinite)))) errors.push(`${e.id}: invalid points`);
    if (e.type === 'image' && !scene.files?.[e.fileId]) errors.push(`${e.id}: missing embedded image ${e.fileId}`);
  }
  for (const e of live) {
    for (const binding of [e.startBinding, e.endBinding].filter(Boolean)) {
      const target = ids.get(binding.elementId);
      if (!target) errors.push(`${e.id}: dangling arrow endpoint ${binding.elementId}`);
      else if (!target.boundElements?.some(b => b.id === e.id && b.type === 'arrow')) errors.push(`${e.id}: missing reciprocal arrow binding`);
    }
    if (e.containerId) {
      const target = ids.get(e.containerId);
      if (!target?.boundElements?.some(b => b.id === e.id && b.type === 'text')) errors.push(`${e.id}: missing reciprocal text binding`);
    }
    for (const b of e.boundElements || []) {
      const target = ids.get(b.id);
      if (!target) errors.push(`${e.id}: dangling bound element ${b.id}`);
      else if (b.type === 'text' && target.containerId !== e.id) errors.push(`${e.id}: inconsistent text container`);
      else if (b.type === 'arrow' && ![target.startBinding?.elementId, target.endBinding?.elementId].includes(e.id)) errors.push(`${e.id}: inconsistent arrow reference`);
    }
  }
  return errors;
}
