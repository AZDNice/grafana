import React, { FC } from 'react';
import { CollapsableSection, Field, InfoBox, Input, Switch } from '@grafana/ui';
import { NotificationSettingsProps } from './NotificationChannelForm';

interface Props extends NotificationSettingsProps {
  imageRendererAvailable: boolean;
}

export const NotificationSettings: FC<Props> = ({ currentFormValues, imageRendererAvailable, register }) => {
  return (
    <CollapsableSection label="Notification settings" isOpen={false}>
      <Field label="Default" description="Use this notification for all alerts">
        <Switch name="isDefault" ref={register} />
      </Field>
      <Field label="Include image" description="Captures an image and include it in the notification">
        <Switch name="settings.uploadImage" ref={register} />
      </Field>
      {currentFormValues.uploadImage && !imageRendererAvailable && (
        <InfoBox title="No image renderer available/installed">
          Grafana cannot find an image renderer to capture an image for the notification. Please make sure the Grafana
          Image Renderer plugin is installed. Please contact your Grafana administrator to install the plugin.
        </InfoBox>
      )}
      <Field
        label="Disable Resolve Message"
        description="Disable the resolve message [OK] that is sent when alerting state returns to false"
      >
        <Switch name="disableResolveMessage" ref={register} />
      </Field>
      <Field label="Send reminders" description="Send additional notifications for triggered alerts">
        <Switch name="sendReminder" ref={register} />
      </Field>
      {currentFormValues.sendReminder && (
        <>
          <Field
            label="Send reminder every"
            description="Specify how often reminders should be sent, e.g. every 30s, 1m, 10m, 30m or 1h etc."
          >
            <Input name="frequency" ref={register} />
          </Field>
          <InfoBox>
            Alert reminders are sent after rules are evaluated. Therefore a reminder can never be sent more frequently
            than a configured alert rule evaluation interval.
          </InfoBox>
        </>
      )}
    </CollapsableSection>
  );
};
