import React from "react";

export function BlankCardIcon() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-2 w-3/4 rounded bg-white" />
    </div>
  );
}

export function ImageAndTextIcon() {
  return (
    <div className="flex h-full w-full gap-2">
      <div className="w-1/2 rounded bg-white" />
      <div className="flex w-1/2 flex-col gap-1">
        <div className="h-2 w-full rounded bg-white" />
        <div className="h-2 w-2/3 rounded bg-white" />
      </div>
    </div>
  );
}

export function TextAndImageIcon() {
  return (
    <div className="flex h-full w-full gap-2">
      <div className="flex w-1/2 flex-col gap-1">
        <div className="h-2 w-full rounded bg-white" />
        <div className="h-2 w-2/3 rounded bg-white" />
      </div>
      <div className="w-1/2 rounded bg-white" />
    </div>
  );
}

export function TwoColumnsIcon() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-4 w-full rounded bg-white" />
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-2 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThreeColumnsIcon() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-4 w-full rounded bg-white" />
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-2 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FourColumnsIcon() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-4 w-full rounded bg-white" />
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-2 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TwoColumnsWithHeadingsIcon() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-4 w-full rounded bg-white" />
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThreeColumnsWithHeadingsIcon() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-4 w-full rounded bg-white" />
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BulletsIcon() {
  return (
    <div className="flex h-full w-full flex-col gap-1">
      <div className="mb-1 h-3 w-3/4 rounded bg-gray-300" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-white" />
          <div className="h-2 flex-1 rounded bg-white" />
        </div>
      ))}
    </div>
  );
}

export function TwoImageColumnsIcon() {
  return (
    <div className="flex h-full w-full flex-col gap-1">
      <div className="h-3 w-full rounded bg-white" />
      <div className="flex h-8 w-full items-center justify-center rounded bg-white"></div>
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThreeImageColumnsIcon() {
  return (
    <div className="flex h-full w-full flex-col gap-1">
      <div className="h-3 w-full rounded bg-white" />
      <div className="flex h-8 w-full items-center justify-center rounded bg-white"></div>
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FourImageColumnsIcon() {
  return (
    <div className="flex h-full w-full flex-col gap-1">
      <div className="h-3 w-full rounded bg-white" />
      <div className="flex h-8 w-full items-center justify-center rounded bg-white"></div>
      <div className="flex h-full w-full gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="flex w-1/2 flex-col gap-1" key={i}>
            <div className="h-2 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-full rounded bg-white" />
            <div className="h-1 w-2/3 rounded bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
