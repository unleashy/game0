import { type FormEvent } from "react";
import { type PlayerSettings } from "../Game";

export interface SettingsPanelProps {
  initialSettings: PlayerSettings;
  onCommit: (settings: PlayerSettings) => void;
}

export function SettingsPanel({
  initialSettings,
  onCommit,
}: SettingsPanelProps) {
  function handleChange(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget as Record<string, HTMLInputElement>;

    onCommit({
      gravity: form.gravity.valueAsNumber,
      friction: form.friction.valueAsNumber,
      moveAccel: form.moveAccel.valueAsNumber,
      maxVelocity: {
        x: form.maxVelocityX.valueAsNumber,
        y: form.maxVelocityY.valueAsNumber,
      },
    });
  }

  return (
    <form onChange={handleChange} className="grid-panel">
      <legend className="panel-header">
        <h2>Settings</h2>
      </legend>

      <label htmlFor="gravity">Gravity</label>
      <input
        id="gravity"
        type="number"
        defaultValue={initialSettings.gravity}
        className="numeric-input"
      />

      <label htmlFor="friction">Coefficient of friction</label>
      <input
        id="friction"
        type="number"
        step="0.01"
        defaultValue={initialSettings.friction}
        className="numeric-input"
      />

      <label htmlFor="moveAccel">Movement acceleration</label>
      <input
        id="moveAccel"
        type="number"
        defaultValue={initialSettings.moveAccel}
        className="numeric-input"
      />

      <label htmlFor="maxVelocityX">Maximum velocity (x)</label>
      <input
        id="maxVelocityX"
        type="number"
        min="0"
        defaultValue={initialSettings.maxVelocity.x}
        className="numeric-input"
      />

      <label htmlFor="maxVelocityY">Maximum velocity (y)</label>
      <input
        id="maxVelocityY"
        type="number"
        min="0"
        defaultValue={initialSettings.maxVelocity.y}
        className="numeric-input"
      />
    </form>
  );
}
